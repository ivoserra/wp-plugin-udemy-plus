import Rating from '@mui/material/Rating/index.js'
// wordpress version of the render from react
import { render, useState, useEffect } from '@wordpress/element';
import { apiFetch } from '@wordpress/api-fetch';


// rendering react components
function RecipeRating({ postID, avgRating, loggedIn , ratingCount}){

   const [ averageRating, setAverageRating ]= useState(avgRating)
   const [ permission, setPermission ]=useState(loggedIn)

   useEffect(()=>{
    if(ratingCount){
        setPermission(false)
    }
   },[])

    return(
        <Rating
        value={averageRating}
        precision={0.5}
        onChange={ async(event, rating)=> {
            if(!permission){
                return alert('You must be logged in to rate a recipe')
            }
            setPermission(false)

            const response = await apiFetch({
                path: 'up/v1/rate',
                method: 'POST',
                data: {
                    postId: postID,
                    rating
                }
            })
            if(response.status == 2){
                setAverageRating(response.rating)
            }
        }}
        />
    )
}


document.addEventListener('DOMContentLoaded', () => {

    const block = document.querySelector('#recipe-rating');
    const postID = parseInt(block.dataset.postId);
    const avgRating = parseFloat(block.dataset.avgRating);
    // double negation attribute will convert the value to boolean
    const loggedIn = !!block.dataset.loggedIn;
    const ratingCount = !!parseInt(block.dataset.ratingCount);

    // console.log(block, postID, avgRating, loggedIn );
    render(
    <RecipeRating 
    postId={postID} 
    avgRating={avgRating} 
    loggedIn={loggedIn}
    ratingCount={ratingCount}
    />, 
    block
    )

})