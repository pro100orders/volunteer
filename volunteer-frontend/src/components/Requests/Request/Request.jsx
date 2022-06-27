import {useSelector} from "react-redux";
import {Card, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Request = ({request}) => {
    return (
        <Card style={{padding: 10, marginBottom: 2}}>
            <div style={{display: "flex"}}>
                {request.request ?
                    <Typography style={{marginRight: 5}}>
                        Потреба / Робота
                    </Typography>
                    :
                    <Typography style={{marginRight: 5}}>
                        Моя допомога
                    </Typography>
                }
                |
                {request.payment ?
                    <Typography style={{marginLeft: 5, marginRight: 5}}>
                        Оплачується
                    </Typography>
                    :
                    <Typography style={{marginLeft: 5, marginRight: 5}}>
                        Не оплачується
                    </Typography>
                }
                |
                {request.status &&
                    <Typography style={{marginLeft: 5}}>
                        Виконана
                    </Typography>
                }
            </div>
            <Typography variant="h5">
                <Link to={"/requests/" + request.id}>
                    {request.title}
                </Link>
            </Typography>
            <Typography variant="h6">
                Адреса: {request.address}
            </Typography>
            Опис:
            <Typography variant="body2" style={{maxWith: 120}}>
                {request.description}
            </Typography>
            <Typography variant="body1">
                Дата публікації:
                {
                    " " + request.createdAt[2] + "." + request.createdAt[1] + "." + request.createdAt[0] + " " +
                    request.createdAt[3] + ":" + request.createdAt[4] + ":" + request.createdAt[5]
                }
            </Typography>
        </Card>
    );
};

export default Request;