using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace JobTitlesLogic
{
    public interface ILogic
    {
        IQueryable<string> GetJobTitlesLogic();
        IQueryable<Tuple<string, string, string>> GetFilteredJobsLogic(string title);
    }
}
