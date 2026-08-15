import { NextResponse } from 'next/server';
import { getTariff } from '@/data/tariffs/database';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const discom = searchParams.get('discom');
  const category = searchParams.get('category');

  if (!discom || !category) {
    return NextResponse.json({ error: 'Missing required parameters: discom, category' }, { status: 400 });
  }

  try {
    const tariff = getTariff(discom, category);
    return NextResponse.json(tariff);
  } catch (error) {
    console.error('Tariff API Error:', error);
    return NextResponse.json({ error: 'Internal server error while resolving tariff.' }, { status: 500 });
  }
}
