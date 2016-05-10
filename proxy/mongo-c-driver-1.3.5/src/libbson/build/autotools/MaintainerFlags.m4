AS_IF([test "x$enable_maintainer_flags" = "xyes" && test "x$GCC" = "xyes"],
      [check_cc_cxx_flag([-Wall],                         [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wall"])
       check_cc_cxx_flag([-Waggregate-return],            [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Waggregate-return"])
       check_cc_cxx_flag([-Wcast-align],                  [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wcast-align"])
       check_cc_cxx_flag([-Wdeclaration-after-statement], [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wdeclaration-after-statement"])
       check_cc_cxx_flag([-Wempty-body],                  [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wempty-body"])
       check_cc_cxx_flag([-Wformat],                      [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wformat"])
       check_cc_cxx_flag([-Wformat-nonliteral],           [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wformat-nonliteral"])
       check_cc_cxx_flag([-Wformat-security],             [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wformat-security"])
       check_cc_cxx_flag([-Winit-self],                   [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Winit-self"])
       check_cc_cxx_flag([-Winline],                      [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Winline"])
       check_cc_cxx_flag([-Wmissing-include-dirs],        [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wmissing-include-dirs"])
       check_cc_cxx_flag([-Wno-strict-aliasing],          [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wno-strict-aliasing"])
       check_cc_cxx_flag([-Wno-uninitialized],            [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wno-uninitialized"])
       check_cc_cxx_flag([-Wredundant-decls],             [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wredundant-decls"])
       check_cc_cxx_flag([-Wreturn-type],                 [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wreturn-type"])
       check_cc_cxx_flag([-Wshadow],                      [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wshadow"])
       check_cc_cxx_flag([-Wswitch-default],              [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wswitch-default"])
       check_cc_cxx_flag([-Wswitch-enum],                 [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wswitch-enum"])
       check_cc_cxx_flag([-Wundef],                       [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wundef"])
       check_cc_cxx_flag([-Wuninitialized],               [MAINTAINER_CFLAGS="$MAINTAINER_CFLAGS -Wuninitialized"])])
AC_SUBST(MAINTAINER_CFLAGS)
