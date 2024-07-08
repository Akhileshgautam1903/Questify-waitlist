// app/api/waitlist/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Email from '../../../models/Email';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const email = await Email.create(body);
    return NextResponse.json({ success: true, data: email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
