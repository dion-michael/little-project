import moment from 'antd/node_modules/moment';

export default (type: 'CLAIM' | 'BPU' | 'MPPA_PK') => {
    const time = moment().format('DDMMYYYY-hhmmA');
    return `EXPORT_${type}_${time}`;
};
