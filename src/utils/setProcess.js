import { Spinner } from "../components/spinner/Spinner";
import { ErrorMessage } from "../components/errorMessage/ErrorMessage";

export const setProcess = ({PendingComponent=<Spinner />, FulfilledComponent, RejectedComponent=<ErrorMessage />, process}) => {
    switch(process) {
        case 'pending': return PendingComponent;
        case 'fulfilled': return FulfilledComponent;
        case 'rejected': return RejectedComponent;
        default: return null
    }
}