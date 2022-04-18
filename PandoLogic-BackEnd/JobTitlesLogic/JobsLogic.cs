using JobTitlesData;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JobTitlesLogic
{
    public class JobsLogic : ILogic
    {
        private readonly IJobsData _jobsData;

        public JobsLogic(IJobsData jobsData)
        {
            _jobsData = jobsData;
        }
        
        public IQueryable<string> GetJobTitlesLogic()
        {
            return _jobsData.GetJobTitlesFromDB();
        }

        public IQueryable<Tuple<string, string, string>> GetFilteredJobsLogic(string title)
        {
            return _jobsData.GetFilteredJobsFromDB(title);
        }
    }
}
