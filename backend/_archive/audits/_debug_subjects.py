import os, re

sim_dir = r'D:\platform\frontend\components\simulations'
prefixes = ['HistoryCivics','CommercialStudies','ComputerScience','BusinessStudies','AppliedMaths','EconApplications','CommerceApp','Mathematics','Biotechnology','Accountancy','HomeScience','LegalStudies','Psychology','Sociology','PoliticalScience','Philosophy','Anthropology','Physics','Chemistry','Biology','Geography','Economics','History','Civics','Commerce','Computer','EVS','Econ','English','Hindi','Sanskrit','Arts','Music','PhysicalEducation','ValueEducation']
pat = "|".join(sorted(prefixes, key=len, reverse=True))
pattern = re.compile(rf'^C(\d{{1,2}})_({pat})(.+?)Sim(?:_\d+)?(?:_old)?\.tsx$')

unmatched_subjects = set()
for root, dirs, files in os.walk(sim_dir):
    for f in files:
        if f.endswith('.tsx') and not pattern.match(f) and f.startswith('C'):
            m = re.match(r'^C\d{1,2}_([A-Z][a-z]+(?:[A-Z][a-z]+)*)', f)
            if m:
                unmatched_subjects.add(m.group(1))
print('Unmatched subject prefixes:', sorted(unmatched_subjects))
