import img2  from '../assests/greece.jpg';
import './banner.scss';
function Banner(){
    return(
        <div class="bannerdiv">
           <img src ={img2} width = "100% "  height= "500px"   />
        </div>
    )
}

export default Banner;