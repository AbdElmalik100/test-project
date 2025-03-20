import { Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'

const Sort = ({ options, selected, sortData, setFilterationData }) => {
    const [sort, setSort] = useState("newest")
    

    const sortedData = useMemo(() => {
        if (!sortData) return [];
        return sort === 'newest' 
            ? [...sortData.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
            : [...sortData.data].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }, [sortData, sort]);

    useEffect(() => {
        setFilterationData(sortedData);
    }, [sortedData, setFilterationData]);

    // useEffect(() => {
    //     if (sortData) {            
    //         const sortedData = sort === 'newest' ? [...sortData.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : [...sortData.data].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) 
    //         setFilterationData(sortedData)
    //     }
    // }, [sortData, sort])
    
    return (
        <Select
            defaultValue={options[selected]}
            size='large'
            onChange={(value) => setSort(value)}
            style={{
                width: 120,
            }}
            options={options}
        />
    )
}

export default Sort