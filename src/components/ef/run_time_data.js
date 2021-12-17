let dataDefalut =
{
    id: "10.5.108.198.1",
    label: "10.5.108.198.1",
    equipName: "SATA Nvidia",
    des: "Lenovo IBM X3250服务器",
    level: 1,
    children: [
        {
            id: "10.5.108.198.2",
            label: "10.5.108.198.2",
            equipName: "Nvidia",
            level: 2,
            children: [
                { id: "10.5.108.198.3", label: "10.5.108.198.3", equipName: "Nvidia", level: 3, },
                { id: "10.5.108.198.4", label: "10.5.108.198.4", equipName: "Nvidia", level: 3, },
                { id: "10.5.108.198.5", label: "10.5.108.198.5", equipName: "Nvidia", level: 3, }
            ],
        },
        {
            id: "10.5.108.198.6",
            label: "10.5.108.198.6",
            equipName: "Nvidia",
            level: 2,
        },
        {
            id: "10.5.108.198.7",
            label: "10.5.108.198.7",
            equipName: "Nvidia",
            level: 2,
        },
        {
            id: "10.5.108.198.8",
            label: "10.5.108.198.8",
            equipName: "Nvidia",
            level: 2,
        },
        {
            id: "10.5.108.198.9",
            label: "10.5.108.198.9",
            equipName: "Nvidia",
            level: 2,
            children: [
                {
                    id: "10.5.108.198.10",
                    label: "10.5.108.198.10",
                    equipName: "Nvidia",
                    level: 3,
                },
                {
                    id: "10.5.108.198.11",
                    label: "10.5.108.198.11",
                    equipName: "Nvidia",
                    level: 3,
                },
                {
                    id: "10.5.108.198.12",
                    label: "10.5.108.198.12",
                    equipName: "Nvidia",
                    level: 3,
                },
            ],
        },
    ],
}

export function getDataDefault() {
    return dataDefalut
}
