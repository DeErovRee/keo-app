import Link from "next/link";
import '../styles/header.css'

export default function TheHeader () {
    return(
        <header>
            <Link href="/">
                <button>Home</button>
            </Link>
            <Link href="/calculate">
                <button>Calculate</button>
            </Link>
            <Link href="/about">
                <button>About</button>
            </Link>
        </header>
    )
}