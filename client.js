export * from "./lib/ui/index";

import { i18n, library, addRoute, renderWithId } from "meteor/citizensay:core";
import { faCheck, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { Poll } from './lib/ui/components/Poll';

//i18n.addResources("en", "polls", {});
library.add(
    faCheck,
    faEllipsisH
);

addRoute({
    path: "/polls/:id",
    render: ({ match }) => renderWithId(Poll, match.params.id)
});