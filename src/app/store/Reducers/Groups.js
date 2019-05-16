import * as mutations from '../mutations'; 

export function groups(groups = [],action){
    switch(action.type){
        case mutations.SET_STATE:
            return action.state.groups;
    }
    return groups
}