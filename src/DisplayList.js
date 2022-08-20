const DisplayList = ( ({dbList}) => {
    // console.log(dbList);

    const listArray = [dbList];

    for (let list in dbList) {
        // console.log(list)

    listArray.push(dbList);

    // return(
    //         <li key={list}>
    //             {list.listName}   
    //         </li>
    //     )  
            
    }
    console.log(listArray);
})

export default DisplayList;