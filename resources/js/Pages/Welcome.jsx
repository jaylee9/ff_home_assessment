import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <header>
                <div className="container mx-auto relative">
                    <nav className="flex flex-wrap items-center p-4">
                        <a href="#"
                           className="font-bold font-serif hover:text-opacity-75 inline-flex items-center leading-none mr-auto text-secondary-500 text-xl uppercase">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="2em"
                                 xmlSpace="preserve" fill="teal" viewBox="0 0 24 24" height="2em"
                                 className="mr-2 text-primary-500">
                                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-14.243L7.757 12 12 16.243 16.243 12 12 7.757z"></path>
                                        </svg>
                            <span>Logo</span> </a>
                        <button className="hover:bg-white hover:text-secondary-500 lg:hidden px-3 py-2 rounded text-secondary-500" data-name="nav-toggler" data-pg-ia='{"l":[{"name":"NabMenuToggler","trg":"click","a":{"l":[{"t":"^nav|[data-name=nav-menu]","l":[{"t":"set","p":0,"d":0,"l":{"class.remove":"hidden"}}]},{"t":"#gt# span:nth-of-type(1)","l":[{"t":"tween","p":0,"d":0.2,"l":{"rotationZ":45,"yPercent":300}}]},{"t":"#gt# span:nth-of-type(2)","l":[{"t":"tween","p":0,"d":0.2,"l":{"autoAlpha":0}}]},{"t":"#gt# span:nth-of-type(3)","l":[{"t":"tween","p":0,"d":0.2,"l":{"rotationZ":-45,"yPercent":-300}}]}]},"pdef":"true","trev":"true"}]}' data-pg-ia-apply="$nav [data-name=nav-toggler]">
                            <span className="block border-b-2 border-current my-1 w-6"></span>
                            <span className="block border-b-2 border-current my-1 w-6"></span>
                            <span className="block border-b-2 border-current my-1 w-6"></span>
                        </button>
                        <div className="lg:flex lg:space-x-4 lg:space-y-0 lg:w-auto space-y-2 w-full hidden lg:items-center" data-name="nav-menu">
                            <div className="flex flex-col lg:flex-row">
                                <a href="#"
                                   className="hover:text-opacity-75 lg:px-6 lg:py-4 py-2 text-black">Home</a>
                                <a href="#"
                                   className="hover:text-opacity-75 lg:px-6 lg:py-4 py-2 text-black">About</a>
                                <a href="#"
                                   className="hover:text-opacity-75 lg:px-6 lg:py-4 py-2 text-black">Services</a>
                            </div>
                            {auth.user ? (
                                <Link
                                    href={route('leads.index')}
                                    className="rounded-md px-3 py-2 bg-teal-600 text-white hover:bg-teal-500 hover:text-white ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Leads
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 bg-teal-600 text-white hover:bg-teal-500 hover:text-white ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md px-3 py-2 bg-teal-600 text-white hover:bg-teal-500 hover:text-white ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
            <main>
                <section className="bg-[rgba(32,18,121,1)] text-white">
                    <div className="container mx-auto pb-24 pt-24 px-4 relative">
                        <div className="-mx-4 flex flex-wrap items-center space-y-6 lg:space-y-0">
                            <div className="px-4 w-full lg:w-6/12">
                                <h1 className="font-bold lg:text-7xl mb-4 sm:text-6xl text-5xl">Your Personal Leads Application</h1>
                                <p className="mb-6 text-opacity-50 text-white text-xl sm:pr-12">Lorem ipsum
                                    dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar faucibus
                                    neque, nec rhoncus nunc ultrices sit amet.</p>
                                <a href="#" className="bg-primary-500 hover:bg-primary-700 inline-block px-6 py-2 rounded text-white">Contact Now</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-black pt-12 text-gray-300">
                <div className="container mx-auto px-4 relative">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full p-4 xl:w-4/12">
                            <a href="#" className="font-bold font-serif hover:text-opacity-75 inline-flex items-center leading-none mb-6 text-3xl text-primary-500 uppercase">
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="2em"
                                     xmlSpace="preserve" fill="teal" viewBox="0 0 24 24" height="2em"
                                     className="mr-2 text-primary-500">
                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-14.243L7.757 12 12 16.243 16.243 12 12 7.757z"></path>
                                </svg>
                                <span>Logo</span>
                            </a>
                            <p className="mb-4 text-sm"> Duis pharetra venenatis felis, ut tincidunt ipsum consequat
                                nec. Fusce et porttitor libero, eu aliquam nisi. Nam finibus ullamcorper semper. </p>
                            <div className="mb-6">
                                <a href="#" className="hover:text-primary-600">+1 234 567-890</a>
                                <br />
                                <a href="#" className="hover:text-primary-600">hello@fantico.com</a>
                            </div>
                        </div>
                        <div className="p-4 w-full sm:w-6/12 md:w-4/12 xl:w-2/12">
                            <h2 className="font-bold mb-8 text-lg text-primary-500 uppercase"> About </h2>
                            <ul>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-primary-600">Get Quote</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-primary-600">Business Deal</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-primary-600">Privacy Policy</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-primary-600">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                        <div className="p-4 w-full sm:w-6/12 md:w-4/12 xl:w-2/12">
                            <h2 className="font-bold mb-8 text-lg text-primary-500 uppercase"> Services </h2>
                            <ul>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-primary-600">Custom Cakes</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-primary-600">Special Cakes</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-primary-600">Birthday Cakes</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-primary-600">Wedding Cakes</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-primary-600">Graduation Cakes</a>
                                </li>
                            </ul>
                        </div>
                        <div className="p-4 w-full md:w-4/12 xl:w-4/12">
                            <h2 className="font-bold mb-8 text-lg text-primary-500 uppercase">Subscribe</h2>
                            <p className="mb-4"> Subscribe to our newsletter and get exclusive updates directly in your
                                inbox. </p>
                            <form>
                                <div
                                    className="bg-white flex items-center mb-6 overflow-hidden p-1">
                                    <input
                                        className="appearance-none flex-1 font-light outline-none p-2 text-gray-600 w-full border-none"
                                        placeholder="Enter email..." type="email"/>
                                    <button type="submit"
                                            className="bg-teal-600 font-medium hover:bg-teal-400 inline-block px-6 py-2 text-center text-white uppercase"
                                            aria-label="submit">
                                        <svg viewBox="0 0 24 24" fill="white" className="h-4 inline-block w-4">
                                            <path
                                                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"/>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                            <h2 className="font-bold mb-4 text-lg text-primary-500 uppercase">Get Social</h2>
                            <div className="flex-wrap inline-flex space-x-3">
                                <a href="#" aria-label="facebook" className="hover:text-primary-500">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path
                                            d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
                                    </svg>
                                </a>
                                <a href="#" aria-label="twitter" className="hover:text-primary-500">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path
                                            d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                                    </svg>
                                </a>
                                <a href="#" aria-label="instagram" className="hover:text-primary-500">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path
                                            d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                                    </svg>
                                </a>
                                <a href="#" aria-label="linkedin" className="hover:text-primary-500">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path
                                            d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
                                    </svg>
                                </a>
                                <a href="#" aria-label="youtube" className="hover:text-primary-500">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path
                                            d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="py-4">
                        <hr className="mb-4 opacity-25" />
                            <div className="flex flex-wrap -mx-4  items-center">
                                <div className="px-4 py-2 w-full md:flex-1">
                                    <p>&copy; 2020 - 2024. All Rights Reserved - Company Name</p>
                                </div>
                                <div className="px-4 py-2 w-full sm:w-auto">
                                    <a href="#" className="hover:text-primary-500">Privacy Policy</a> |
                                    <a href="#" className="hover:text-primary-500">Terms of Use</a>
                                </div>
                            </div>
                    </div>
                </div>
            </footer>

        </>
    );
}
