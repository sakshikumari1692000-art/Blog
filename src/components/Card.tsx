import { useNavigate } from "react-router-dom";
import type { Post } from "../types";

interface CardProps{
    post : Post ;
}
const Card = (props: CardProps) =>{
    const navigate = useNavigate();
   return(
    <div  
        onClick = {() => navigate(`/post/${props.post.id}`)}
        className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer
        hover:shadow-md transition-shadow duration-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
             {props.post.title}
        </h2>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {props.post.content}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-400" >
            <span>{props.post.authorName}</span>
            <span>{new Date(props.post.createdAt).toLocaleDateString()}</span>
        </div>
    </div>
   );
}

export default Card;