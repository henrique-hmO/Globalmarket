import { NextRequest, NextResponse } from 'next/server';
import { checkTrialAccess, registerTrialAccess } from '@/lib/supabase';

// Get client IP address
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    const ipAddress = getClientIp(req);

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if IP already used trial
    const hasUsedTrial = await checkTrialAccess(ipAddress);

    if (hasUsedTrial) {
      return NextResponse.json(
        { 
          allowed: false, 
          message: 'Trial já utilizado neste dispositivo. Assine para acesso completo.' 
        },
        { status: 403 }
      );
    }

    // Register trial access
    const registered = await registerTrialAccess(ipAddress, productId);

    if (!registered) {
      return NextResponse.json(
        { error: 'Failed to register trial access' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      allowed: true,
      message: 'Trial access granted'
    });
  } catch (error) {
    console.error('Trial access error:', error);
    return NextResponse.json(
      { error: 'Failed to process trial access' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const ipAddress = getClientIp(req);
    const hasUsedTrial = await checkTrialAccess(ipAddress);

    return NextResponse.json({ 
      hasUsedTrial,
      ipAddress 
    });
  } catch (error) {
    console.error('Trial check error:', error);
    return NextResponse.json(
      { error: 'Failed to check trial status' },
      { status: 500 }
    );
  }
}
