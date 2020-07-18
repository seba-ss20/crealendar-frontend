import React from 'react';
import { PromotionList } from '../components/PromotionList';
import PromotionService from '../services/PromotionService';
import ls from 'local-storage'

export class PromotionListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });
        let user = ls.get('userObject');
        PromotionService.getPromotionsByOwnerId(user['_id']).then((data) => {
			console.log("received data in PromotionListView")
			console.log(data)
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    async removePromotion(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });

        try {
            let ret = await PromotionService.deletePromotion(id);
            let promotionIndex = this.state.data.map(promotion => promotion['_id']).indexOf(id);
            let promotions = this.state.data;
            promotions.splice(promotionIndex, 1);
            this.setState({
                data: [...promotions],
                loading: false
            });
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        if (Array.isArray(this.state.data) && !this.state.data.length) {
            return (<h4>It seems that you do not organize an promotion yet. To create new one, click "Create Promotion" button.</h4>);
        }

        return (
            <PromotionList data={this.state.data} />
        );
    }
}