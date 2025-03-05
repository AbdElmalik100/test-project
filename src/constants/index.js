export const topStats = {
    projects: {
        icon: "ph:folder-duotone",
        total: 178,
        title: "عدد المشاريع"
    },
    supervisors: {
        icon: "ph:user-circle-light",
        total: 178,
        title: "عدد المشرفين"
    },
    missions: {
        icon: "ph:file",
        total: 178,
        title: "عدد المهام"
    },
    employees: {
        icon: "ph:user-circle-light",
        total: 178,
        title: "عدد الموظفين"
    },
}

export const monthes = [
    {
        name: "يناير",
        value: "jan",
    },
    {
        name: "فبراير",
        value: "feb",
    },
    {
        name: "مارس",
        value: "mar",
    },
    {
        name: "ابريل",
        value: "apr",
    },
    {
        name: "يونيو",
        value: "june",
    },
    {
        name: "يوليو",
        value: "july",
    },
    {
        name: "اغسطس",
        value: "aug",
    },
    {
        name: "سبتمبر",
        value: "sep",
    },
    {
        name: "اكتوبر",
        value: "oct",
    },
    {
        name: "نوفمبر",
        value: "nov",
    },
    {
        name: "ديسمبر",
        value: "dec",
    },
]

export const chartMonthes = ["ديسمبر", "نوفمبر", "اكتوبر", "سبتمبر",'اغسطس', 'يوليو', 'يونيو', 'ابريل', 'مارس', 'فبراير', 'يناير'];

export const asideLinks = [
    {
        title: "الرئيسية",
        links: [
            {
                path: "/",
                name: "لوحة التحكم",
                icon: "solar:home-angle-outline",
            },
        ]
    },
    {
        title: "المشاريع",
        links: [
            {
                path: "/projects-list",
                name: "قائمة المشاريع",
                icon: "ph:folder-duotone",
            },
            {
                path: "/project-add",
                name: "اضافة مشروع جديد",
                icon: "mi:folder-add",
            },
        ]
    },
    {
        title: "المهام",
        links: [
            {
                path: "/missions-list",
                name: "جميع المهام",
                icon: "ph:file",
            },
            {
                path: "/mission-add",
                name: "اضافة مهمة جديدة",
                icon: "ant-design:file-add-outlined",
            },
        ]
    },
    {
        title: "التقارير",
        links: [
            {
                path: "/reports",
                name: "التقارير",
                icon: "ph:chart-bar-horizontal",
            },
        ]
    },
    {
        title: "الموظفين",
        links: [
            {
                path: "/employees-list",
                name: "قائمة الموظفين",
                icon: "ph:user-circle-light",
            },
            {
                path: "/employees-add",
                name: "اضافة موظف جديد",
                icon: "ph:user-circle-plus-light",
            },
            {
                path: "/employees-permission",
                name: "الصلاحيات",
                icon: "ph:user-circle-plus-light",
            },

        ]
    },
    {
        title: "المشرفين",
        links: [
            {
                path: "/supervisors-list",
                name: "قائمة المشرفين",
                icon: "ph:user-circle-light",
            },
            {
                path: "/supervisors-add",
                name: "اضافة مشرف جديد",
                icon: "ph:user-circle-plus-light",
            },
        ]
    },
]