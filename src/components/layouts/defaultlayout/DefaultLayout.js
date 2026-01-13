import Header from '../header/Header'
import Footer from '../footer/Footer'
import Sidebar from '../Sidebar/Sidebar';
import styles from './DefaultLayout.module.scss';

function DefaultLayout({children}){
    return(
        <div className={styles.layoutWrapper}>
            <Header/>
            <Sidebar/>
            <div className={styles.mainContent}>
                <main>
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    )
}
export default DefaultLayout;