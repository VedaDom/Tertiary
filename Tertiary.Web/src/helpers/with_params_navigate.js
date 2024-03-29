import { useNavigate, useParams } from 'react-router-dom';

export default function withParamsAndNavigate(Component) {
    return (props) => (
        <Component {...props} params={useParams()} navigate={useNavigate()} />
    );
}