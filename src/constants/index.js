export const topStats = {
    projects: {
        icon: "ph:folder-duotone",
        title: "عدد المشاريع"
    },
    supervisors: {
        icon: "ph:user-circle-light",
        title: "عدد المشرفين"
    },
    tasks: {
        icon: "ph:file",
        title: "عدد المهام"
    },
    employees: {
        icon: "ph:user-circle-light",
        title: "عدد الموظفين"
    },
}

export const monthesOptions = [
    {
        label: "يناير",
        value: "1",
    },
    {
        label: "فبراير",
        value: "2",
    },
    {
        label: "مارس",
        value: "3",
    },
    {
        label: "ابريل",
        value: "4",
    },
    {
        label: "مايو",
        value: "5",
    },
    {
        label: "يونيو",
        value: "6",
    },
    {
        label: "يوليو",
        value: "7",
    },
    {
        label: "اغسطس",
        value: "8",
    },
    {
        label: "سبتمبر",
        value: "9",
    },
    {
        label: "اكتوبر",
        value: "10",
    },
    {
        label: "نوفمبر",
        value: "11",
    },
    {
        label: "ديسمبر",
        value: "12",
    },
]
export const yearlyOptions = Array.from(Array(5)).map((el, index) => ({label: new Date().getFullYear() - index, value: new Date().getFullYear() - index}))
export const sortOptions = [
    {
        label: "الاحدث",
        value: "newest",
    },
    {
        label: "الاقدم",
        value: "oldest",
    },
]

export const chartMonthesLabels = ["يناير", "فبراير", "مارس", "ابريل", "مايو", 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];

export const asideLinks = [
    {
        title: "الرئيسية",
        links: [
            {
                path: "/",
                name: "لوحة التحكم",
                icon: "solar:home-angle-outline",
                permission: "عرض التقارير"
            },
        ],
        permissions: ["عرض التقارير"]
    },
    {
        title: "المشاريع",
        links: [
            {
                path: "/projects-list",
                name: "قائمة المشاريع",
                icon: "ph:folder-duotone",
                permission: "عرض المشاريع"
            },
            {
                path: "/projects-add",
                name: "اضافة مشروع جديد",
                icon: "mi:folder-add",
                permission: "إنشاء مشروع"
            },
        ],
        permissions: ["إنشاء مشروع", "عرض المشاريع"]
    },
    {
        title: "المهام",
        links: [
            {
                path: "/tasks-list",
                name: "جميع المهام",
                icon: "ph:file",
                permission: "عرض المهام"
            },
            {
                path: "/tasks-add",
                name: "اضافة مهمة جديدة",
                icon: "ant-design:file-add-outlined",
                permission: "إنشاء مهمة"
            },
        ],
        permissions: ["إنشاء مهمة", "عرض المهام"]
    },
    {
        title: "التقارير",
        links: [
            {
                path: "/reports",
                name: "التقارير",
                icon: "ph:chart-bar-horizontal",
                permission: "عرض التقارير"
            },
        ],
        permissions: ["عرض التقارير"]
    },
    {
        title: "الموظفين",
        links: [
            {
                path: "/employees-list",
                name: "قائمة الموظفين",
                icon: "ph:user-circle-light",
                permission: "عرض الموظفين"
            },
            {
                path: "/employees-add",
                name: "اضافة موظف جديد",
                icon: "ph:user-circle-plus-light",
                permission: "إنشاء موظف"
            },
            {
                path: "/permissions",
                name: "الصلاحيات",
                icon: "ph:user-circle-plus-light",
                permission: "عرض الأدوار"
            },
        ],
        permissions: ["إنشاء موظف", "عرض الأدوار", "عرض الموظفين"]
    },
    {
        title: "المقاولين",
        links: [
            {
                path: "/supervisors-list",
                name: "قائمة المقاولين",
                icon: "ph:user-circle-light",
                permission: "عرض المقاولين"
            },
            {
                path: "/supervisors-add",
                name: "اضافة مقاول جديد",
                icon: "ph:user-circle-plus-light",
                permission: "إنشاء مقاول"
            },
        ],
        permissions: ["إنشاء مقاول", "عرض المقاولين"]
    },
]

export const projectStatus = [
    {
        value: "منتهي",
        label: "منتهي"
    },
    {
        value: "ملغي",
        label: "ملغي"
    },
    {
        value: "قيد التنفيذ",
        label: "قيد التنفيذ"
    },
    {
        value: "معلق",
        label: "معلق"
    },
]

export const stagesOptions = [
    {
        value: "",
        label: "الكل",
    },
    {
        value: "مرحلة البناء",
        label: "مرحلة البناء",
    },
    {
        value: "مرحلة البنية التحتية",
        label: "مرحلة البنية التحتية"
    },
    {
        value: "مرحلة التشطيب والتسليم",
        label: "مرحلة التشطيب والتسليم"
    },
]

// export const permissions = [
//     { "id": 1, "name": "عرض الأدوار" },
//     { "id": 2, "name": "إنشاء دور" },
//     { "id": 3, "name": "تعديل دور" },
//     { "id": 4, "name": "حذف دور" },
//     { "id": 5, "name": "عرض الموظفين" },
//     { "id": 6, "name": "إنشاء موظف" },
//     { "id": 7, "name": "تعديل موظف" },
//     { "id": 8, "name": "حذف موظف" },
//     { "id": 9, "name": "عرض المقاولين" },
//     { "id": 10, "name": "إنشاء مقاول" },
//     { "id": 11, "name": "تعديل مقاول" },
//     { "id": 12, "name": "حذف مقاول" },
//     { "id": 13, "name": "عرض المشاريع" },
//     { "id": 14, "name": "إنشاء مشروع" },
//     { "id": 15, "name": "تعديل مشروع" },
//     { "id": 16, "name": "حذف مشروع" },
//     { "id": 17, "name": "عرض المهام" },
//     { "id": 18, "name": "إنشاء مهمة" },
//     { "id": 19, "name": "تعديل مهمة" },
//     { "id": 20, "name": "حذف مهمة" },
//     { "id": 21, "name": "عرض التقارير" }
// ]

