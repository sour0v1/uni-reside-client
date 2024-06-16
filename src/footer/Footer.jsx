import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        // TODO : update content
        <footer className="footer p-10 bg-[#151515] text-white font-roboto">
            <aside>
                <h1 className='bg-white text-white bg-opacity-40 opacity-90 font-bold text-4xl w-9 h-9 flex justify-center items-center'>U</h1>
                <p><span className='font-medium text-xl'>UniReside</span><br />Savor delicious meals every day.</p>
            </aside>
            <nav>
                <h6 className="footer-title">Quick Links</h6>
                <Link to={'/meals'} className="link link-hover">Meals</Link>
                <Link className="link link-hover">Membership</Link>
                <Link className="link link-hover">Upcoming Meals</Link>
                <Link className="link link-hover">Reviews</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Authority</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Terms & Condition</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;