import PromotionFormPage from '../components/PromotionFormPage'
import PromotionService from '../services/PromotionService';
import React from 'react';
import ls from 'local-storage'


export class PromotionFormPageView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.history.location.pathname === '/createPromotion') {
            this.setState({
                loading: false,
                promotion: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state !== undefined && this.props.location.state.promotion !== undefined) {
            this.setState({
                loading: false,
                promotion: this.props.location.state.promotion,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;
            PromotionService.getPromotion(id).then((data) => {
                this.setState({
                    promotion: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    async updatePromotion(promotion) {
        if(this.state.promotion === undefined) {
            try {
                let user = ls.get('userObject');
                let userId = user['_id'];
                promotion.owner = userId;
				console.log("promotion.owner")
				console.log(promotion.owner)
				console.log(promotion)
                let ret = await PromotionService.createPromotion(userId,promotion);
                this.props.history.push('/organizer');
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating promotion'}));
            }
        } else {
            try {
                let ret = await PromotionService.updatePromotion(promotion);
                this.props.history.goBack();
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while updating promotion'}));
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<PromotionFormPage promotion={this.state.promotion} onSubmit={(promotion) => this.updatePromotion(promotion)} error={this.state.error} />);
    }
}