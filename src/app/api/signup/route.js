import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../utils/db';
import Signup from '../../../models/Signup';

export async function POST(request) {
    try {
        await connectDB();

        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const phone = formData.get('phone');

        const existingUser = await Signup.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Signup({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        await newUser.save();

        return NextResponse.json(
            { message: 'Signup successful', user: newUser },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
