// export action creators
import * as loginActions from './loginAction';
import * as navigationActions from './navigationActions';
import * as crewLookupActions from './crewLookupActions';
import * as crewLookupByIdActions from './crewLookupByIdActions';
import * as topItemsListAction from './topItemsListAction';
import * as allItemsAction from './allItemsAction';
import * as pickListAction from './pickListAction';
import * as euipmentListAction from './euipmentListAction';
import * as selectedBaseUrl from './selectedBaseUrl';
import * as loginTruck from './truckLoginAction';

export const ActionCreators = Object.assign(
    {},
    loginActions,
    navigationActions,
    crewLookupActions,
    crewLookupByIdActions,
    topItemsListAction,
    allItemsAction,
    pickListAction,
    euipmentListAction,
    selectedBaseUrl,
    loginTruck
);
