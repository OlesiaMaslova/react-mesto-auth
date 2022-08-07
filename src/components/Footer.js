function Footer() {
  
        const time = new Date();
        
    return(
        <footer className="footer">
            <p className="footer__copyright">&copy;&nbsp;{`${time.getFullYear()} Mesto Russia`}</p>
        </footer>
    );
}

export default Footer;
