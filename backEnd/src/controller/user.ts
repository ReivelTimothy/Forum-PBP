import { User } from "../../models/user"; 
import { v4 as uuidv4 } from 'uuid';
import { generateToken } from '../utils/jwt_helper';


const SECRET_KEY = 'RAHASIA123';
// -- POST Login
export const login = async (req: any, res: any) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(401).json({ message: "Email tidak ditemukan" });
            return;
        }

        if (user.password !== password) {
            res.status(401).json({ message: "Password salah" });
            return;
        }

        const token = generateToken(user.user_id)
        res.status(500).json({ message: "berhasil login", token });
        return;
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
        return;
    }
}
// -- POST Register
export const register = async (req: any, res: any) => {
    const { username, email, password } = req.body;
    const userId = uuidv4();
    try {
        const user = await User.create({
            userId,    
            username,
            email,
            password,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
}

//GET all user --
export const getAllUser = async (req: any, res: any) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
}


// -- GET User by ID
export const getUserById = async (req: any, res: any) => {
    const userId = req.params.userId; // Ambil user_id dari parameter URL
    try {
        const user = await User.findOne({ where: { userId } });
        if (!user) {
            res.status(404).json({ message: "User tidak ditemukan" });
            return;
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
}

// -- Update user
export const updateUser = async (req: any, res: any) => {
    const userId = req.params.userId; // Ambil user_id dari parameter URL
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ where: { userId } });
        if (!user) {
            res.status(404).json({ message: "User tidak ditemukan" });
            return;
        }

        await User.update(
            { username, email, password },
            { where: { userId } }
        );

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
}

// -- logout    
export const logout = async (req: any, res: any) => {
    try {
        // Hapus token dari client-side
        res.status(200).json({ message: "Berhasil logout" });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
}










