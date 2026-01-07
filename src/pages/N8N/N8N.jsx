import { Box } from '@mui/material';

const N8N = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <iframe
        src="https://development-ses.changepond.com/n8n"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px',
        }}
        title="N8N Workflows"
      />
    </Box>
  );
};

export default N8N;
