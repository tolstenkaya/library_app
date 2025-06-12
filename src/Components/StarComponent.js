import React, { useEffect, useState } from "react";
import star_img from "../images/icons/star.svg";

export const StarComponent = ({rating, maxRating=5})=>{
    const [stars, setStars] = useState([]);


    useEffect(()=>{
        const total_percent = rating*100/maxRating;
        const count_starts = maxRating;
        const percent_per_star = 100/count_starts;
        const filled_star = Math.floor(total_percent/percent_per_star);
        const half_filled_star = total_percent%percent_per_star;

        const new_stars = [];

        for(let i=0; i<count_starts; i++){
            if(i<filled_star){
                new_stars.push(100);
            }
            else if(i===filled_star && half_filled_star>0){
                new_stars.push(50);
            }
            else{
                new_stars.push(0);
            }
        }
        setStars(new_stars);
    },[rating,maxRating]);

   

    return(
        <div>
            {
                stars.map((star, index)=>(
                    // <img src={star_img} style={{width:"20px", height:"20px"}}/>
                   <svg key={index} width="24" height="24" viewBox="0 0 24 24">
                    <defs>
                        <clipPath id={`clip-${index}`}>
                            <rect x="0" y="0" width={(star / 100) * 24} height="24" />
                        </clipPath>
                    </defs>

                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#e0e0e0"/>
                    
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    fill="gold"
                    clipPath={`url(#clip-${index})`}/>
                
                    </svg>
                ))
            }
        </div>
    );
};