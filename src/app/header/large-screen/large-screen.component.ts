import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryMenu } from 'src/app/Interfaces/categoryMenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-large-screen',
  templateUrl: './large-screen.component.html',
  styleUrls: ['./large-screen.component.css']
})
export class LargeScreenComponent implements OnInit {
  @Input() menu!: CategoryMenu[];
  @Input() showMiniCart: Boolean = true;
  @Input() numberOfCartItems: any;
  @Input() cartBadgeShow:any;
  @Input() userToken: any;
  @Output() logoutEvent = new EventEmitter<string>();
  @Output() categoryClickEvent = new EventEmitter<string>();
  @Output() subCategoryClickEvent = new EventEmitter<string>();
  env =  environment;
  currentRoute: string = "";
  public showSearch:Boolean = false;
  public searchTerms = "";
  public hideMenu = false;
  

  @ViewChild('search') searchElement!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(){
    $(document).ready(function () {
      activeMobile();
      $(window).resize(function () {
        if (window.innerWidth < 992) {
          $(".pos-menu-horizontal").addClass("pos-mobile-menu");
          $("#_mobile_megamenu img").parent("a").addClass("img_banner");
          $(".pos-mobile-menu").removeClass("container");
        } else {
          $(".pos-menu-horizontal").removeClass("pos-mobile-menu");
          $(".pos-menu-horizontal .menu-dropdown").show();
        }
      });
      posInitHorizontalMegamenu();
      $("#_desktop_megamenu img").parent("a").addClass("img_desktop");
      $("#_mobile_megamenu img").parent("a").addClass("img_banner");
      // window.top.ceFrontend.hooks.addAction(
      //   "frontend/element_ready/widget",
      //   function ($scope, $) {
      //     var widget = $scope.data("element_type");
      //     if (widget == "pos_menu.default") {
      //       posInitHorizontalMegamenu();
      //     }
      //   }
      // );
    });

    function activeMobile() {
      $(".pos-menu-horizontal .menu-item > .icon-drop-mobile").on(
        "click",
        function () {
          if ($(this).hasClass("open_menu")) {
            $(".pos-menu-horizontal .menu-item > .icon-drop-mobile").removeClass(
              "open_menu"
            );
            $(this).removeClass("open_menu");
            $(this).next(".pos-menu-horizontal .menu-dropdown").slideUp();
            $(".pos-menu-horizontal .menu-item > .icon-drop-mobile")
              .next(".pos-menu-horizontal .menu-dropdown")
              .slideUp();
          } else {
            $(".pos-menu-horizontal .menu-item > .icon-drop-mobile").removeClass(
              "open_menu"
            );
            $(".pos-menu-horizontal .menu-item > .icon-drop-mobile")
              .next(".pos-menu-horizontal .menu-dropdown")
              .slideUp();
            $(this).addClass("open_menu");
            $(this).next(".pos-menu-horizontal .menu-dropdown").slideDown();
          }
        }
      );

      $(".pos-menu-horizontal .cat-drop-menu .icon-drop-mobile").on(
        "click",
        function () {
          if ($(this).hasClass("open_menu")) {
            $(this)
              .parent()
              .siblings()
              .find(".icon-drop-mobile")
              .removeClass("open_menu");
            $(this).removeClass("open_menu");
            $(this).next(".pos-menu-horizontal .cat-drop-menu").slideUp();
            $(this).parent().siblings().find(".cat-drop-menu").slideUp();
          } else {
            $(this)
              .parent()
              .siblings()
              .find(".icon-drop-mobile")
              .removeClass("open_menu");
            $(this).parent().siblings().find(".cat-drop-menu").slideUp();
            $(this).addClass("open_menu");
            $(this).next(".pos-menu-horizontal .cat-drop-menu").slideDown();
          }
        }
      );
      $(".pos-menu-horizontal .pos-menu-col > .icon-drop-mobile").on(
        "click",
        function () {
          if ($(this).hasClass("open_menu")) {
            $(".pos-menu-horizontal .pos-menu-col > .icon-drop-mobile").removeClass(
              "open_menu"
            );
            $(this).removeClass("open_menu");
            $(this).next(".pos-menu-horizontal ul.ul-column").slideUp();
            $(".pos-menu-horizontal .pos-menu-col > .icon-drop-mobile")
              .next(".pos-menu-horizontal ul.ul-column")
              .slideUp();
          } else {
            $(".pos-menu-horizontal .pos-menu-col > .icon-drop-mobile").removeClass(
              "open_menu"
            );
            $(".pos-menu-horizontal .pos-menu-col > .icon-drop-mobile")
              .next(".pos-menu-horizontal ul.ul-column")
              .slideUp();
            $(this).addClass("open_menu");
            $(this).next(".pos-menu-horizontal ul.ul-column").slideDown();
          }
        }
      );
      $(".pos-menu-horizontal .submenu-item  > .icon-drop-mobile").on(
        "click",
        function () {
          if ($(this).hasClass("open_menu")) {
            $(
              ".pos-menu-horizontal .submenu-item  > .icon-drop-mobile"
            ).removeClass("open_menu");
            $(this).removeClass("open_menu");
            $(this).next(".pos-menu-horizontal ul.category-sub-menu").slideUp();
            $(".pos-menu-horizontal .submenu-item  > .icon-drop-mobile")
              .next(".pos-menu-horizontal ul.category-sub-menu")
              .slideUp();
          } else {
            $(
              ".pos-menu-horizontal .submenu-item  > .icon-drop-mobile"
            ).removeClass("open_menu");
            $(".pos-menu-horizontal .submenu-item  > .icon-drop-mobile")
              .next(".pos-menu-horizontal ul.category-sub-menu")
              .slideUp();
            $(this).addClass("open_menu");
            $(this).next(".pos-menu-horizontal ul.category-sub-menu").slideDown();
          }
        }
      );
    }

    function posInitHorizontalMegamenu() {
      var $menuHorizontal = $(".pos-menu-horizontal");
      var $list = $menuHorizontal.find("li.hasChild");
      $list.hover(function () {
        setOffset($(this));
      });
      var li;
      var setOffset = function (li: any) {
        var $dropdown = li.find(".menu-dropdown");
        if ($dropdown.hasClass("cat-drop-menu")) {
          return;
        }
        $dropdown.css({ right: "", left: "", width: $dropdown.data("width") });
        var dropdownWidth = $dropdown.outerWidth();
        var dropdownOffset = $dropdown.offset();
        var toRight;
        var viewportWidth: any;
        var dropdownOffsetRight;
        var $window = $(window);
        var $body = $("body");
        var screenWidth = window.innerWidth;
        if (!dropdownWidth || !dropdownOffset) {
          return;
        }
        if (dropdownWidth > screenWidth) {
          dropdownWidth = screenWidth;
        }
        $dropdown.css({ width: dropdownWidth });
        if (li.hasClass("hasChild") && dropdownWidth > 1200) {
          viewportWidth = window.innerWidth;
          if (dropdownOffset.left + dropdownWidth >= viewportWidth) {
            toRight = dropdownOffset.left + dropdownWidth - viewportWidth;
            $dropdown.css({ left: -toRight });
          }
          li.addClass("menu_initialized");
        } else if (li.hasClass("dropdown-mega")) {
          viewportWidth = $("#header .elementor-container").innerWidth();
          dropdownOffsetRight = viewportWidth - dropdownOffset.left - dropdownWidth;
          var extraSpace = 0;
          var containerOffset = (window.innerWidth - viewportWidth) / 2;
          var dropdownOffsetLeft;
          if (dropdownWidth >= viewportWidth) {
            extraSpace = (viewportWidth - dropdownWidth) / 2;
          }
          dropdownOffsetLeft = dropdownOffset.left - containerOffset;
          if (dropdownOffsetLeft + dropdownWidth >= viewportWidth) {
            toRight = dropdownOffsetLeft + dropdownWidth - viewportWidth;
            $dropdown.css({ left: -toRight - extraSpace - 10 });
          }
          li.addClass("menu_initialized");
        } else {
          li.addClass("menu_initialized");
        }
      };
      $list.each(function () {
        setOffset($(this));
      });
    }

    // var $search = $(".pos-search");
    // var $searchContainer = $(".pos-search__container");
    // if ($search.hasClass("search-topbar")) {
    //   $("body").on("click", ".pos-search__toggle", function () {
    //     $searchContainer.removeClass("unvisible");
    //   });
    //   $("body").on("click", ".dialog-close-button", function () {
    //     $searchContainer.addClass("unvisible");
    //   });
    // }

  }

  logoutClick = () => {
    this.logoutEvent.emit();
  }

  categoryClick = (categoryname: any) =>{
    this.categoryClickEvent.emit(categoryname);
    this.hideMenu = true;
  }

  subCategoryClick = (subCatName: any) =>{
    this.subCategoryClickEvent.emit(subCatName);
    this.hideMenu = true;
  }

  enableMenuBlock = () =>{
    this.hideMenu = false;
  }

  toggleSearchShow = () =>{
    this.showSearch = !this.showSearch
    if(this.showSearch){
      setTimeout(()=>{
    this.searchElement.nativeElement.focus();
  },0); 
}
    this.showSearch ? "" : this.searchTerms = "";
  }
  

  showSearchTerms = () => {
    this.searchTerms ? this.router.navigate([`ourproducts`,{term: this.searchTerms}]): '';
    this.searchTerms = this.searchTerms ? '': this.searchTerms
      this.showSearch = !this.showSearch;
  }
  } 
