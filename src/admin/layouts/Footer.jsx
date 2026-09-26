import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer
            className="w-full py-8 px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-highest border-t border-outline-variant z-10 relative mt-auto">
            <p className="font-label-md text-label-md text-on-secondary-fixed-variant text-center md:text-left">
                © 2026 EYENECK. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
                <a className="font-label-md text-label-md text-on-secondary-fixed-variant hover:text-primary transition-colors cursor-pointer"
                   href="#">Privacy Policy</a>
                <a className="font-label-md text-label-md text-on-secondary-fixed-variant hover:text-primary transition-colors cursor-pointer"
                   href="#">Terms of Service</a>
                <a className="font-label-md text-label-md text-on-secondary-fixed-variant hover:text-primary transition-colors cursor-pointer"
                   href="#">Legal Notice</a>
                <Link to={"#"} className="font-label-md text-label-md text-on-secondary-fixed-variant hover:text-primary transition-colors cursor-pointer"
                   >Contact Us</Link>
            </div>
        </footer>
    )
}
export default Footer
