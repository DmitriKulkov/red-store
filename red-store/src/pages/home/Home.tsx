import React, {FC} from 'react'
import classes from './Home.module.css'

const Home:FC = () => {
    return (
        <div className={classes.home}>
            <div className={classes.background}>
                <h1 className={classes.title}>Welcome new collection</h1>
                <h1 className={classes.title__description}>
                    zalupa zalupa zalupa zalupa <br/>
                    zalupa zalupa <br/>
                    zalupa zalupa zalupa <br/>
                    zalupa zalupa zalupa zalupa <br/>
                </h1>
            </div>
            <div className={classes.collection}>
                <h1 className={classes.collection__title}>
                    Summer collection
                </h1>
                <div>

                </div>
            </div>
        </div>
    )
}
export default Home;