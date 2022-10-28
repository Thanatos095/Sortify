import React from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import VisualArray from '../VisualArray/VisualArray';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    InputLabel,
    MenuItem,
    FormControl,
    Slider,
    Popper,
    Fade,
    Paper
} from '@mui/material'

interface NavBar_props{
    sortMappings : { [index : string] : (v : VisualArray) => Generator<void> },
    setSort : ( sorter : (v : VisualArray) => Generator<void> ) => void
    setFPS : (value : number) => void
    play : () => void,
    pause : () => void,
}


export default function NavBar(props : NavBar_props) {
    const [sort, setsort] = React.useState('Bubble Sort');
    const [playing, setplaying] = React.useState(false);
    const [fps, setfps] = React.useState(60);
    const [open, setopen] = React.useState(false);
    const [popperAnchor, setpopperAnchor] = React.useState<HTMLElement>();

    const handleSelect = (event: SelectChangeEvent) => {
        setsort(event.target.value as string);
        props.setSort(props.sortMappings[event.target.value]);
    };

    const handlePlaying = () => {
        if(playing) props.pause();
        else props.play();
        setplaying(!playing);
    }

    const handleSlider = (event: Event, newValue: number | number[]) => {
        setfps(newValue as number);
        props.setFPS(newValue as number);
    };
    
    const handlePopperOpen = (event : React.MouseEvent<HTMLElement>) => {
        setpopperAnchor(event.currentTarget);
        setopen(!open);
    };


    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar color='primary' position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sortify
                </Typography>
                <Box display = 'flex' width='50%' justifyContent='center' alignItems='center'>
                    <Box>
                        <Button size = 'large' variant = 'outlined' sx = {{backgroundColor : 'primary.light', color : 'white'}} onClick = {handlePopperOpen}>
                            Generate!
                        </Button>
                        <Popper open={open} anchorEl ={popperAnchor} placement='bottom' transition>
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper sx = {{width : 240, height : 250}}>
                                <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                                </Paper>
                            </Fade>
                            )}
                      </Popper>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <Select
                                sx = {{
                                        color : 'white',
                                        backgroundColor : 'primary.light',
                                    }}
                                value = {sort}
                                defaultValue='Bubble Sort'
                                onChange={handleSelect}
                            >
                                {
                                Object.keys(props.sortMappings).map( key => 
                                    <MenuItem value = {key} key={ key }> { key } </MenuItem>
                                )
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box >
                    {   

                        !playing ? 
                            <Button size='large' variant="outlined" sx = {{backgroundColor : 'primary.light', color : 'white'}} onClick = {handlePlaying}>Play</Button>
                        :
                            <Button size='large' variant="outlined" sx = {{backgroundColor : 'primary.light', color : 'white'}} onClick = {handlePlaying}>Pause</Button>
                    }
                    </Box>
                    <Box width={150}>
                        <Typography color="white">Speed</Typography>
                        <Slider
                            
                            value = {fps}
                            onChange = {handleSlider}
                            defaultValue={60}
                            min = {1}
                            max = {60}
                            color="secondary"
                    />
                </Box>
                </Box>
                </Toolbar>
        </AppBar>
    </Box>
    )
}
