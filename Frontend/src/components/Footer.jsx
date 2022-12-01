import React from 'react'

export default function Footer() {
    return (
        <footer className="p-4 bg-gray-100 rounded-lg shadow sm:flex sm:items-center sm:justify-between md:p-6 border-t-2 border-gray-300 sticky z-50">
    <span className="text-sm text-gray-700 sm:text-center">© 2022 Job Search - Agustin Rios
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-700 sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
</footer>)
}
