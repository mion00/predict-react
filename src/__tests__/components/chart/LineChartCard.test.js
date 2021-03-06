import React from 'react';
import {shallow} from 'enzyme';
import {CardTitle} from 'react-md/lib/Cards/index';
import LineChartCard from '../../../components/chart/LineChartCard';
import {Chart} from 'react-google-charts';

const traces = {
  '2011-10-07': 83,
  '2011-10-01': 23,
  '2011-10-03': 119,
  '2011-10-04': 85,
  '2011-10-05': 106,
  '2011-10-06': 80,
};
const cardTitle = 'Card title';
const chartTitle = 'Chart title';

describe('LineChartCard', () => {
  it('renders', () => {
    const element = shallow(<LineChartCard cardTitle={cardTitle} chartTitle={chartTitle} data={traces}/>);
    expect(element).toBeDefined();
    expect(element.find(Chart).length).toBe(1);
    expect(element.find(CardTitle).props().title).toBe(cardTitle);
  });

  it('creates options with titles', () => {
    const element = shallow(<LineChartCard cardTitle={cardTitle} chartTitle={chartTitle} data={traces}/>);

    const chartProps = element.find(Chart).props();

    expect(chartProps.columns[1].label).toBe(chartTitle);
    expect(chartProps.options.vAxis.title).toBe(chartTitle);
    expect(chartProps.graph_id).toBe(cardTitle);
  });

  it('maps data', () => {
    const element = shallow(<LineChartCard cardTitle={cardTitle} chartTitle={chartTitle} data={traces}/>);
    const chartProps = element.find(Chart).props();

    expect(chartProps.rows.length).toBe(6);
    expect(chartProps.rows[0]).toEqual([new Date('2011-10-01'), 23]);
  });
});
