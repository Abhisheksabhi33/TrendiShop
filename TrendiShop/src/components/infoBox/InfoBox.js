import React from 'react'
import styles from './InfoBox.module.scss'
import Card from '../card/Card'

const InfoBox = ({cardClass, title, count, icon}) => {

    if(title === "Earnings"){
        return (
            <div className={styles["info-box"]} >
        <Card cardClass = {cardClass} >
           <h4>{title}</h4>
           <span>
              <h3>&#8377; {count}</h3>
              {icon}
            </span> 

        </Card>

    </div>
        )
    }


  return (
    <div className={styles["info-box"]} >
        <Card cardClass = {cardClass} >
           <h4>{title}</h4>
           <span>
              <h3> {count}</h3>
              {icon}
            </span> 

        </Card>

    </div>
  )
}

export default InfoBox