l am a table component;

## usage


```
npm install yt-table --save

//or 

yarn add yt-table

```

### code
```
<Table
    // old had abandon
    // rowKey={record => record.id}
    getRowKey={record => record.id}
    dataSource={dataSource}
    columns={columns}
    onCellChange={this.handleCellChange}
/>
```

### examples

```
git clone https://github.com/yt1520406335/yt-table.git

cd examples/test/

yarn install
// or
npm install

// l use 'parcel' as Packaging tools

parcel index.html

open http://localhost:1234
```

### Reference resources
- [react-data-grid](https://github.com/adazzle/react-data-grid)

