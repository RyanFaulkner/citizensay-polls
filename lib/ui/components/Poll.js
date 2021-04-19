import React, { useState } from "react";

// Data
import { useTracker } from "meteor/react-meteor-data";
import { Polls } from "../../api/collections/polls";

// UI
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, ListGroup } from "react-bootstrap";


export const Poll = ({ id }) => {
    const { t } = useTranslation("polls");
    const { poll, user } = useTracker(() => {
        Meteor.subscribe("polls");
        return {
            poll: Polls.findOne(id),
            user: Meteor.userId()
        };
    });
    const [ changed, setChanged ] = useState(false);
    if(!poll) {
        return (
            <>
                { t('loading') }
            </>
        );
    } else {
        const { _id, question, options, multi } = poll;
        const type = multi ? "checkbox" : "radio";
        return (
            <>
                <h5>{ question }</h5>
                <Form onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    let v = {};
                    if(multi)
                        e.target[_id].forEach(r => v[r.value] = r.checked);
                    else
                        v = options.reduce((a, r) => {
                            a[r.value] = (r.value === e.target[_id].value);
                            return a;
                        }, {});
                    Meteor.call("polls.vote", _id, v);
                    setChanged(false);
                }} onChange={() => {
                    setChanged(true);
                }}>
                    <ListGroup>
                        {
                            options.map((o, i) => {
                                const { value, votes } = o;
                                const checked = votes.includes(user);
                                return (
                                    <ListGroup.Item
                                        key={_id + "_o" + i}
                                        variant={checked && "success"}
                                    >
                                        <Form.Check
                                            {...{ value, type }}
                                            name={_id}
                                            label={value}
                                            defaultChecked={checked}
                                        />
                                    </ListGroup.Item>
                                );
                            })
                        }
                    </ListGroup>
                    <Button type="submit">
                        <FontAwesomeIcon icon={changed ? "ellipsis-h": "check"}/>
                    </Button>
                </Form>
            </>
        );
    }
};