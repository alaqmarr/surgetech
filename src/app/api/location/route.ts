import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pincode = searchParams.get('pincode');

  if (!pincode || !/^\d{6}$/.test(pincode)) {
    return NextResponse.json({ error: 'Invalid PIN code. Please provide a valid 6-digit Indian PIN.' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
      // Add a reasonable timeout in real production, Next.js fetch usually handles this based on config
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from postal API');
    }

    const data = await response.json();

    if (!data || !Array.isArray(data) || data[0].Status !== 'Success' || !data[0].PostOffice || data[0].PostOffice.length === 0) {
      return NextResponse.json({ error: 'PIN code not found.' }, { status: 404 });
    }

    // Extract relevant data from the first post office match
    const po = data[0].PostOffice[0];

    const locationData = {
      pincode: po.Pincode,
      state: po.State,
      district: po.District,
      city: po.Block || po.Region || po.District,
      country: po.Country,
      source: "api.postalpincode.in",
      resolvedAt: new Date().toISOString()
    };

    return NextResponse.json(locationData);

  } catch (error) {
    console.error('Location API Error:', error);
    return NextResponse.json({ error: 'Internal server error while resolving PIN code.' }, { status: 500 });
  }
}
