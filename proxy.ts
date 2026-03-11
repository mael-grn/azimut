import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers";
import {TokenUtil} from "@/app/utils/TokenUtil";
import {SqlUtil} from "@/app/utils/SqlUtil";

export async function proxy(request: NextRequest) {

    // On exclue les requetes POST sur /api/user permettant de créer un utilisateur
    if (request.nextUrl.pathname === '/api/users' && request.method === 'POST') {
        return NextResponse.next();
    }

    // On exclue les requetes POST sur /session permettant de se logger
    if (request.nextUrl.pathname === '/api/sessions' && request.method === 'POST') {
        return NextResponse.next();
    }

    // On récupère le cookie 'token' pour vérifier l'authentification
    const cookieStore = await cookies()
    const Cookietoken = cookieStore.get('token')
    let token = ""

    // Si le token existe pas erreur 401
    if (!Cookietoken || !Cookietoken.value || Cookietoken.value.length === 0) {

        // Récupération du header Authorization
        const authHeader = request.headers.get('authorization');

        // Vérifier sa présence et son format
        if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ').length !== 2) {
            if (request.nextUrl.pathname.startsWith('/api')) {
                return NextResponse.json("Non autorisé", { status: 401 });
            } else {
                const url = request.nextUrl.clone();
                url.pathname = '/login';
                return NextResponse.redirect(url);
            }
        }

        // Isoler le token (en retirant "Bearer ")
        token = authHeader.split(' ')[1];

    } else {
        token = Cookietoken.value;
    }

    // On vérifie le token
    const res = await TokenUtil.verifyToken(token);

    // Si le token est invalide ou expiré, on supprime le cookie et retourne une erreur 401
    if (!res) {
        cookieStore.delete('token');
        cookieStore.delete('user');
        if (request.nextUrl.pathname.startsWith('/api')) {
            return NextResponse.json("Non autorisé", { status: 401 });
        } else {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }

    }

    const id = await TokenUtil.getIdFromToken(token);

    const sql = SqlUtil.getSql();
    const [user] = await sql`
        SELECT * FROM users WHERE id = ${id}
    `;

    if (!user) {
        cookieStore.delete('token');
        cookieStore.delete('user');
        if (request.nextUrl.pathname.startsWith('/api')) {
            return NextResponse.json("Non autorisé", { status: 401 });
        } else {
            return NextResponse.redirect("/login");
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/api/:path*',
        '/users/:path*',
    ],
}