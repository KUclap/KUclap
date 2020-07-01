module.exports = async function () {
  // console.log(pages);
  const index = [
    {
      url: "/",
      title: ``,
      meta: {
        title: `KUclap - เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก.`,
        description: `kuclap.com แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`,
      },
      data: {
        type: `website`,
        card: `summary_large_image`,
        url: `https://kuclap.com/`,
        title: `KUclap - เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก.`,
        description: `kuclap.com แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`,
        image: "https://kuclap.com/assets/img/meta-og-image.png",
      },
    },
    {
      url: "/class",
      title: ``,
      isClassPage: true,
      meta: {
        title: `KUclap - เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก.`,
        description: `kuclap.com แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`,
      },
      data: {
        type: `website`,
        card: `summary_large_image`,
        url: `https://kuclap.com/`,
        title: `KUclap - เว็บไซต์ค้นหาและแบ่งปันรีวิววิชาบูรณาการ มก.`,
        description: `kuclap.com แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`,
        image: "https://kuclap.com/assets/img/meta-og-image.png",
      },
    },
  ];

  return index;

  // Data for prerender /:classId route

  // const response = await fetch(
  //   `https://kuclap-api-staging.herokuapp.com/classes`
  // );
  // const pages = await response.json();
  // return pages
  //   .map((page) => ({
  //     url: `/class/${page.classId}`,
  //     title: `รีวิววิชา ${page.nameTh} ${page.nameEn} (${page.classId}) มก. - KUclap`,
  //     meta: {
  //       title: `รีวิววิชา ${page.nameTh} ${page.nameEn} (${page.classId}) มก. - KUclap`,
  //       description: `รีวิววิชา ${page.label} - แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`,
  //     },
  //     data: {
  //       title: `รีวิววิชา ${page.nameTh} ${page.nameEn} (${page.classId}) มก. - KUclap`,
  //       description: `รีวิววิชา ${page.label} - แหล่งรวม ค้นหารีวิว เขียนรีวิว คำแนะนำ วิชาบูรณาการ วิชาบูร วิชาบูรฯ วิชาเสรี วิชาเลือก วิชาศึกษาทั่วไป รีวิว หน่วยกิต ชั่วโมงเรียน อาจารย์ การบ้าน ม.เกษตร มหาวิทยาลัยเกษตรศาสตร์ มก. KU - KUclap`,
  //       image: "https://kuclap.com/assets/img/meta-og-image.png",
  //     },
  //   }))
  //   .concat(index);
};
