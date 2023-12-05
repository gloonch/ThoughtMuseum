import {useParams} from "react-router-dom";

export default function Thought() {
    const {id} = useParams();

    // TODO: get thought by id to show info


    return (
        <div className='max-w-2xl min-w-2xl'>
            Thought page : {id}
        </div>
    )
}