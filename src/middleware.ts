
import { NextRequest, NextResponse } from "next/server"


export async function middleware(request: NextRequest) {
    const response = NextResponse.next()

    const nextPathname = request.nextUrl.pathname // where the user is going
    const isGoingToRoot = nextPathname === "/" // if the user is going to the root route
    if (isGoingToRoot) {
        const redirectTo = new URL("/dashboard", request.url)
        return NextResponse.redirect(redirectTo, { status: 302 })
    } else {
        return response
    }
}
