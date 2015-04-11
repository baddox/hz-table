import React from 'react';

export default class HzTable extends React.Component {
  render() {
    return (
      <table className="pure-table">
        {this.renderHeader()}
        {this.renderBody()}
      </table>
    );
  }

  renderHeader() {
    return (
      <thead>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
        </tr>
      </thead>
    );
  }
  
  renderBody() {
    return (
      <tbody>
        {this.renderRows()}
      </tbody>
    );
  }
  
  renderRows() {
    return [
      (<tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>),
      (<tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>),
      (<tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>),
      (<tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>),
      (<tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>),
    ];
  }
}
