export function getTheme(dimensions) {
  var theme = {
    width: 0,
    height: 0,
    breakpoint: 0,
    fontPageTitle: {
      size: ''
    },
    fontSectionTitle: {
      size: ''
    },
    fontPin: {
      size: ''
    },
    fontNormal: {
      size: ''
    },
    fontSmall: {
      size: ''
    },
    colorBackgroundPrimary: 'rgba(0,0,0,0.8)', //Transparent Grey
    colorBackGroundSecondary: 'rgba(0,0,0,0)', //Clear
    colorPrimary: 'rgba(0,0,0,1)', //Black
    colorSecondary: 'rgba(255,215,0,1)', //Gold
    colorTirtiary: 'rgba(21,21,21,1)', //Grey
    colorButtonAccept: 'rgba(0,204,0,1)', //Green
    colorButtonCancel: 'rgba(255,0,0,1)', //red
    colorTextLight: 'rgba(255,255,255,1)', //White
    colorTextDark: 'rgba(0,0,0,1)', //Black

  }

  const BP1 = 450
  const BP2 = 500
  const BP3 = 550
  const BP4 = 600
  const BP5 = 650
  const BP6 = 700
  const BP7 = 750
  const BP8 = 800

    theme.width = dimensions.width
    theme.height = dimensions.height

    //Breakpoint 1
    if (dimensions.height < BP1) {
      theme.breakpoint = 1
      theme.fontPageTitle.size = '17px'
      theme.fontSectionTitle.size = '13px'
      theme.fontPin.size = '11px'
      theme.fontNormal.size = '9px'
      theme.fontSmall.size = '7px'
    }

    //Breakpoint 2
    if (dimensions.height >= BP1 && dimensions.height < BP2) {
      theme.breakpoint = 2
      theme.fontPageTitle.size = '18px'
      theme.fontSectionTitle.size = '14px'
      theme.fontPin.size = '12px'
      theme.fontNormal.size = '10px'
      theme.fontSmall.size = '8px'
    }

    //Breakpoint 3
    if (dimensions.height >= BP2 && dimensions.height < BP3) {
      theme.breakpoint = 3
      theme.fontPageTitle.size = '19px'
      theme.fontSectionTitle.size = '15px'
      theme.fontPin.size = '13px'
      theme.fontNormal.size = '11px'
      theme.fontSmall.size = '9px'
    }

    //Breakpoint 4
    if (dimensions.height >= BP3 && dimensions.height < BP4) {
      theme.breakpoint = 4
      theme.fontPageTitle.size = '20px'
      theme.fontSectionTitle.size = '16px'
      theme.fontPin.size = '14px'
      theme.fontNormal.size = '12px'
      theme.fontSmall.size = '10px'
    }

    //Breakpoint 5
    if (dimensions.height >= BP4 && dimensions.height < BP5) {
      theme.breakpoint = 5
      theme.fontPageTitle.size = '21px'
      theme.fontSectionTitle.size = '17px'
      theme.fontPin.size = '15px'
      theme.fontNormal.size = '13px'
      theme.fontSmall.size = '11px'
    }

    //Breakpoint 6
    if (dimensions.height >= BP5 && dimensions.height < BP6) {
      theme.breakpoint = 6
      theme.fontPageTitle.size = '22px'
      theme.fontSectionTitle.size = '18px'
      theme.fontPin.size = '16px'
      theme.fontNormal.size = '14px'
      theme.fontSmall.size = '12px'
    }

    //Breakpoint 7
    if (dimensions.height >= BP6 && dimensions.height < BP7) {
      theme.breakpoint = 7
      theme.fontPageTitle.size = '23px'
      theme.fontSectionTitle.size = '19px'
      theme.fontPin.size = '17px'
      theme.fontNormal.size = '15px'
      theme.fontSmall.size = '14px'
    }

    //Breakpoint 8
    if (dimensions.height >= BP7 && dimensions.height < BP8) {
      theme.breakpoint = 8
      theme.fontPageTitle.size = '24px'
      theme.fontSectionTitle.size = '20px'
      theme.fontPin.size = '18px'
      theme.fontNormal.size = '16px'
      theme.fontSmall.size = '14px'
    }
    //Breakpoint 9
    if (dimensions.height >= BP8) {
      theme.breakpoint = 9
      theme.fontPageTitle.size = '25px'
      theme.fontSectionTitle.size = '21px'
      theme.fontPin.size = '19px'
      theme.fontNormal.size = '17px'
      theme.fontSmall.size = '15px'
    }

  return theme
}
