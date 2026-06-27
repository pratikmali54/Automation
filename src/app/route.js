import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 });
    }

    // --- DATABASE LOGIC ---
    // In a real application, you would hash the password and save the new user to your database.
    // Example with Prisma:
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
    console.log(`Simulating registration for: ${name} (${email})`);

    return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}