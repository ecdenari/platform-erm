$(document).ready(function () {
    // databtable for regenal dashbaord
    $('#reginaol-dtatble').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        var data = row.data();
                        return 'Details for ' + data[0] + ' ' + data[1];
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table',

                })
            }
        }
    });

    // databtable for the house traking
    $('#House-Tracking').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        var data = row.data();
                        return 'Details for ' + data[0] + ' ' + data[1];
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table House-Trackingtable',

                })
            }
        }
    });

    // databtable for upload data
    $('#uplodta-tble').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        var data = row.data();
                        return 'Details for ' + data[0] + ' ' + data[1];
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table uploaddta-table',

                })
            }
        }
    });

    // databtable for upload data
    $('#dta-privietable').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        var data = row.data();
                        return 'Details for ' + data[0] + ' ' + data[1];
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table dtapriview-table',

                })
            }
        }
    });

    $(".drop_link").click(function () {
        $("body,html").scrollTop({ scrollTop: 0 });
        return false;
    });


    // dropdown show hide



    // $(".drop_wrap > .drop_link").click(function () {

    //     if (!$(this).parent().hasClass('show')) {
    //         $(".drop_wrap > .drop_link").parent().removeClass('show');
    //         $(this).parent().addClass('show');


    //     } else {
    //         $(this).parent().toggleClass('show');
    //     }

    // });

    // $(".drop_wrap a").click(function () {
    //     $('.drop_wrap a').removeClass('nav-active');
    //     $(this).addClass('nav-active');

    // });


        $(".drop_wrap > .drop_link").removeClass('nav-active');
        $(this).addClass('nav-active');
        
        $("[data-topnav=topnav]>li").click(function () {
            $("[data-topnav=topnav]>li").removeClass("shownav");
            $(this).addClass("shownav");
        
            $("[data-topnav=topnav]>li>ul>li").click(function () {
                $("[data-topnav=topnav]>li>ul>li").removeClass("nav-active");
                $(this).addClass("nav-active");
            });
        
        
        $(".btm-nv>li>a").click(function () {
            $(".btm-nv>li>a").removeClass("nav-active");
            $(this).addClass("nav-active");
            $(".top-nv>li").removeClass("intro");
        });
        


        // $("[data-topnav=topnav]>li>ul>li>a").click(function () {
        //     $("[data-topnav=topnav]>li>ul>li>a").removeClass("nav-active");
        //     $(this).addClass("nav-active");
        // });


        // $("[data-btnnav=btnnav]>li").click(function () {
        //     $("[data-btnnav=btnnav]>li").removeClass("nav-active", 1000);
        //     $(this).addClass("nav-active", 1000);
        // });



        // $(".btm-nv>li>a").click(function () {
        //     $(".btm-nv>li>a").removeClass("nav-active");
        //     $(this).addClass("nav-active");
        //         $(".top-nv>li").removeClass("intro");


        // });


        // $(".top-nv>li>a").click(function () {

        //     $(this).addClass("nav-active");

        // });



    });