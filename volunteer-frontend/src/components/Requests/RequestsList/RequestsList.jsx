import React from 'react';
import {Card, CardActions, CardContent, Skeleton, Typography} from "@mui/material";
import Request from "../Request/Request";

const RequestsList = ({requests, isLoading}) => {

    const mockList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div>
            {
                isLoading ?
                    <div>
                        {mockList.map(id =>
                            <Card sx={{height: "173px", marginBottom: 2}}>
                                <CardContent>
                                    <Skeleton variant="text"/>
                                    <Skeleton variant="text"/>
                                    <Skeleton variant="text"/>
                                    <Skeleton variant="text"/>
                                    <Skeleton variant="text"/>
                                    <Skeleton variant="text"/>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    :
                    <div>
                        {
                            requests.length === 0 ?
                                <Typography variant="h5" component="div">
                                    Даних немає
                                </Typography>
                                :
                                <div>
                                    {
                                        requests.map(request =>
                                            <Request request={request} key={request.id}/>
                                        )
                                    }
                                </div>
                        }
                    </div>
            }
        </div>
    );
};

export default RequestsList;