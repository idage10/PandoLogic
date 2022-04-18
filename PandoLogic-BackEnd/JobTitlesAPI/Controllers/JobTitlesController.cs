using JobTitlesLogic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;

namespace JobTitlesAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JobTitlesController : ControllerBase
    {
        private readonly ILogic _jobsLogic;
        private readonly ILogger<JobTitlesController> _logger;

        public JobTitlesController(ILogic jobsLogic, ILogger<JobTitlesController> logger)
        {
            _jobsLogic = jobsLogic;
            _logger = logger;
        }

        // GET: JobTitles/
        [EnableCors("AllowOrigin")]
        [HttpGet]
        // Get all existing job titles
        public string GetJobTitles()
        {
            try
            {
                return JsonConvert.SerializeObject(_jobsLogic.GetJobTitlesLogic());
            }
            catch (Exception e)
            {
                _logger.LogWarning(e.StackTrace);
            }

            return "[]";
        }

        // GET: JobTitles/driver
        [EnableCors("AllowOrigin")]
        [HttpGet("{title}")]
        // Get available jobs containing {title} in their job title name
        public string GetFilteredJobs(string title)
        {
            try
            {
                return JsonConvert.SerializeObject(_jobsLogic.GetFilteredJobsLogic(title));
            }
            catch (Exception e)
            {
                _logger.LogWarning(e.StackTrace);
            }

            return "[]";
        }
    }
}
